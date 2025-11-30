'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  Select,
  Switch,
  Space,
  App,
  Divider,
  Typography,
  Spin,
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/stores/hooks';
import { isSuperuser } from '@/shared/utils/permissions';
import {
  useProduct,
  useUpdateProduct,
  useCategories,
  useColors,
  useSizes,
  useTags,
  useCreateTag,
} from '../../_api';
import type { CreateProductRequest } from '../../_api';
import type { AdminProduct } from '../../_api/entities/product.entity';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

// Helper function to generate slug from title (supports Persian/Farsi)
const generateSlug = (title: string): string => {
  return title
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Convert AdminProduct to form data
const convertProductToFormData = (product: AdminProduct): Partial<CreateProductRequest> => {
  // Convert variants from nested structure to array
  const variants: Array<{ color_id: number; size_id: number; stock: number }> = [];
  if (product.variant) {
    Object.keys(product.variant).forEach((colorId) => {
      const colorVariants = product.variant[colorId];
      if (colorVariants) {
        Object.keys(colorVariants).forEach((sizeId) => {
          const variantData = colorVariants[sizeId];
          if (variantData && variantData.stock !== undefined) {
            variants.push({
              color_id: parseInt(colorId, 10),
              size_id: parseInt(sizeId, 10),
              stock: variantData.stock,
            });
          }
        });
      }
    });
  }

  return {
    title: product.title,
    slug: product.slug,
    brand: product.brand,
    description: product.description || '',
    short_description: product.short_description || '',
    thumbnail: product.thumbnail,
    categories: product.categories.map((cat) => cat.id),
    discount: product.discount,
    stock: product.stock,
    origin_price: product.orgin_price || product.price, // Note: backend uses "orgin_price" (typo)
    price: product.price,
    is_new: product.is_new,
    is_featured: product.is_featured,
    colors: product.colors.map((c) => c.id),
    sizes: product.sizes.map((s) => s.id),
    tags: product.tags || [],
    features: product.features || [],
    specs: product.specs || [],
  };
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { message } = App.useApp();
  const { user } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm<CreateProductRequest>();
  const productSlug = params?.id as string; // Actually slug from URL
  const { data: product, isLoading: productLoading } = useProduct(productSlug);
  const updateProductMutation = useUpdateProduct();
  const createTagMutation = useCreateTag();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: colors = [], isLoading: colorsLoading } = useColors();
  const { data: sizes = [], isLoading: sizesLoading } = useSizes();
  const { data: tagsData = [], isLoading: tagsLoading, refetch: refetchTags } = useTags();

  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([
    { key: '', value: '' },
  ]);
  const [tags, setTags] = useState<string[]>([]);
  const [variants, setVariants] = useState<
    Array<{ color_id: number; size_id: number; stock: number }>
  >([]);

  const canCreateTags = isSuperuser(user);

  // Load product data into form
  useEffect(() => {
    if (product) {
      const formData = convertProductToFormData(product);
      setThumbnailUrl(product.thumbnail);
      setFeatures(product.features && product.features.length > 0 ? product.features : ['']);
      setSpecs(
        product.specs && product.specs.length > 0
          ? product.specs.map((s) => ({ key: s.key, value: s.value }))
          : [{ key: '', value: '' }],
      );
      setTags(product.tags || []);

      // Convert variants
      const convertedVariants: Array<{ color_id: number; size_id: number; stock: number }> = [];
      if (product.variant) {
        Object.keys(product.variant).forEach((colorId) => {
          const colorVariants = product.variant[colorId];
          if (colorVariants) {
            Object.keys(colorVariants).forEach((sizeId) => {
              const variantData = colorVariants[sizeId];
              if (variantData && variantData.stock !== undefined) {
                convertedVariants.push({
                  color_id: parseInt(colorId, 10),
                  size_id: parseInt(sizeId, 10),
                  stock: variantData.stock,
                });
              }
            });
          }
        });
      }
      setVariants(convertedVariants.length > 0 ? convertedVariants : []);

      form.setFieldsValue(formData);
    }
  }, [product, form]);

  // Remove handleTitleChange - we'll use Form.Item dependencies instead

  const handleSubmit = async (values: CreateProductRequest) => {
    if (!product) {
      message.error('محصول یافت نشد');
      return;
    }

    try {
      const categories = (values.categories || []).map((cat) =>
        typeof cat === 'string' ? parseInt(cat, 10) : cat,
      );

      const productData: Partial<CreateProductRequest> = {
        ...values,
        categories,
        slug: generateSlug(values.title),
        thumbnail: thumbnailUrl || values.thumbnail,
        features: features.filter((f) => f.trim() !== ''),
        specs: specs
          .filter((s) => s.key.trim() !== '' && s.value.trim() !== '')
          .map((s, index) => ({
            key: s.key,
            value: s.value,
            order: index,
          })),
        tags: tags.filter((t) => t.trim() !== ''),
        variants: variants.filter((v) => v.color_id > 0 && v.size_id > 0),
        colors: Array.from(new Set(variants.filter((v) => v.color_id > 0).map((v) => v.color_id))),
        sizes: Array.from(new Set(variants.filter((v) => v.size_id > 0).map((v) => v.size_id))),
        stock: variants.length > 0 ? variants.reduce((sum, v) => sum + (v.stock || 0), 0) : 0,
      };

      // Use product ID for update (backend expects ID, not slug)
      const productId = typeof product.id === 'string' ? parseInt(product.id, 10) : product.id;
      await updateProductMutation.mutateAsync({ id: productId, data: productData });
      message.success('محصول با موفقیت به‌روزرسانی شد');
      router.push('/admin/products');
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'خطا در به‌روزرسانی محصول');
    }
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const addVariant = () => {
    setVariants([...variants, { color_id: 0, size_id: 0, stock: 0 }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: 'color_id' | 'size_id' | 'stock', value: number) => {
    const newVariants = [...variants];
    const oldVariant = { ...newVariants[index] };
    newVariants[index][field] = value;

    if ((field === 'color_id' || field === 'size_id') && value > 0) {
      const duplicateIndex = newVariants.findIndex(
        (v, i) =>
          i !== index &&
          v.color_id === newVariants[index].color_id &&
          v.size_id === newVariants[index].size_id &&
          v.color_id > 0 &&
          v.size_id > 0,
      );
      if (duplicateIndex !== -1) {
        message.warning('این ترکیب رنگ و سایز قبلاً اضافه شده است');
        newVariants[index] = oldVariant;
        setVariants(newVariants);
        return;
      }
    }

    setVariants(newVariants);
  };

  if (productLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex min-h-[400px] items-center justify-center">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <div className="py-8 text-center">
            <Title level={4}>محصول یافت نشد</Title>
            <Button onClick={() => router.push('/admin/products')}>بازگشت به لیست محصولات</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Space direction="vertical" size="large" className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Title level={2} className="mb-0!">
            ویرایش محصول
          </Title>
          <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/admin/products')}>
            بازگشت
          </Button>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            discount: 0,
            price: 0,
            is_new: false,
            is_featured: false,
          }}
        >
          <Row gutter={[16, 16]}>
            {/* Basic Information */}
            <Col xs={24}>
              <Card title="اطلاعات پایه" className="mb-4">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="title"
                      label="عنوان محصول"
                      rules={[
                        { required: true, message: 'عنوان محصول الزامی است' },
                        { min: 3, message: 'عنوان باید حداقل ۳ کاراکتر باشد' },
                      ]}
                    >
                      <Input placeholder="عنوان محصول" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="slug"
                      label="Slug (خودکار از عنوان تولید می‌شود)"
                      dependencies={['title']}
                      rules={[
                        { required: true, message: 'Slug الزامی است' },
                        { min: 3, message: 'Slug باید حداقل ۳ کاراکتر باشد' },
                      ]}
                    >
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.title !== currentValues.title
                        }
                      >
                        {({ getFieldValue }) => {
                          const title = getFieldValue('title');
                          const slug = title ? generateSlug(title) : '';
                          // Update slug when title changes
                          if (slug && slug !== getFieldValue('slug')) {
                            // Use setTimeout to avoid circular reference warning
                            setTimeout(() => {
                              form.setFieldValue('slug', slug);
                            }, 0);
                          }
                          return (
                            <Input
                              placeholder="slug-product"
                              readOnly
                              className="bg-gray-50"
                              value={slug}
                            />
                          );
                        }}
                      </Form.Item>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="brand"
                      label="برند"
                      rules={[
                        { required: true, message: 'برند الزامی است' },
                        { min: 2, message: 'برند باید حداقل ۲ کاراکتر باشد' },
                      ]}
                    >
                      <Input placeholder="نام برند" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="thumbnail"
                      label="آدرس تصویر شاخص"
                      rules={[{ required: true, message: 'تصویر شاخص الزامی است' }]}
                    >
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      name="short_description"
                      label="توضیحات کوتاه"
                      rules={[
                        {
                          max: 500,
                          message: 'توضیحات کوتاه نباید بیشتر از ۵۰۰ کاراکتر باشد',
                        },
                      ]}
                    >
                      <TextArea
                        rows={3}
                        placeholder="توضیحات کوتاه محصول (حداکثر ۵۰۰ کاراکتر)"
                        maxLength={500}
                        showCount
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      name="description"
                      label="توضیحات کامل"
                      rules={[
                        {
                          min: 10,
                          message: 'توضیحات باید حداقل ۱۰ کاراکتر باشد',
                        },
                      ]}
                    >
                      <TextArea rows={6} placeholder="توضیحات کامل محصول" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Categories */}
            <Col xs={24} md={12}>
              <Card title="دسته‌بندی" className="mb-4">
                <Form.Item
                  name="categories"
                  label="دسته‌بندی‌ها"
                  rules={[
                    {
                      required: true,
                      message: 'حداقل یک دسته‌بندی الزامی است',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="انتخاب دسته‌بندی"
                    loading={categoriesLoading}
                    showSearch
                    filterOption={(input, option) => {
                      const label = option?.label || option?.children;
                      return String(label || '')
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  >
                    {categories.map((cat) => (
                      <Option key={cat.id} value={cat.id}>
                        {cat.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Card>
            </Col>

            {/* Tags and Options */}
            <Col xs={24} md={12}>
              <Card title="تگ‌ها و گزینه‌ها" className="mb-4">
                <Space direction="vertical" size="middle" className="w-full">
                  <Form.Item name="tags" label="تگ‌ها">
                    <Select
                      mode="tags"
                      placeholder={
                        canCreateTags
                          ? 'انتخاب یا افزودن تگ (Enter برای افزودن به دیتابیس)'
                          : 'انتخاب تگ'
                      }
                      tokenSeparators={[',']}
                      value={tags}
                      onChange={setTags}
                      loading={tagsLoading || createTagMutation.isPending}
                      showSearch
                      filterOption={(input, option) => {
                        const label = option?.label || option?.children;
                        return String(label || '')
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }}
                      onInputKeyDown={async (e) => {
                        if (canCreateTags && e.key === 'Enter') {
                          const input = e.currentTarget as HTMLInputElement;
                          const value = input.value?.trim();
                          if (
                            value &&
                            !tags.includes(value) &&
                            !tagsData.some((t) => t.name === value)
                          ) {
                            e.preventDefault();
                            try {
                              const newTag = await createTagMutation.mutateAsync(value);
                              await refetchTags();
                              setTags([...tags, newTag.name]);
                              message.success(`تگ "${value}" با موفقیت ایجاد شد`);
                            } catch (error: any) {
                              message.error(error?.response?.data?.message || 'خطا در ایجاد تگ');
                            }
                          }
                        }
                      }}
                    >
                      {tagsData.map((tag) => (
                        <Option key={tag.id} value={tag.name}>
                          {tag.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Divider />

                  <Form.Item name="is_new" label="محصول جدید" valuePropName="checked">
                    <Switch />
                  </Form.Item>

                  <Form.Item name="is_featured" label="محصول ویژه" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Space>
              </Card>
            </Col>

            {/* Pricing */}
            <Col xs={24}>
              <Card title="قیمت‌گذاری" className="mb-4">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="price"
                      label="قیمت (تومان)"
                      rules={[
                        { required: true, message: 'قیمت الزامی است' },
                        { type: 'number', min: 0, message: 'قیمت باید مثبت باشد' },
                      ]}
                    >
                      <InputNumber
                        className="w-full"
                        placeholder="قیمت محصول"
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as any}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item name="origin_price" label="قیمت اصلی (تومان)">
                      <InputNumber
                        className="w-full"
                        placeholder="قیمت اصلی (قبل از تخفیف)"
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as any}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      name="discount"
                      label="تخفیف (%)"
                      rules={[
                        {
                          type: 'number',
                          min: 0,
                          max: 100,
                          message: 'تخفیف باید بین ۰ تا ۱۰۰ باشد',
                        },
                      ]}
                    >
                      <InputNumber
                        className="w-full"
                        placeholder="درصد تخفیف"
                        min={0}
                        max={100}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Variants (Stock per Color + Size) */}
            <Col xs={24}>
              <Card title="موجودی بر اساس رنگ و سایز" className="mb-4">
                <Space direction="vertical" size="middle" className="w-full">
                  {variants.map((variant, index) => (
                    <Row key={index} gutter={8} align="middle">
                      <Col xs={24} md={8}>
                        <Select
                          placeholder="انتخاب رنگ"
                          value={variant.color_id || undefined}
                          onChange={(value) => updateVariant(index, 'color_id', value)}
                          loading={colorsLoading}
                          showSearch
                          filterOption={(input, option) => {
                            const label = option?.label || option?.children;
                            return String(label || '')
                              .toLowerCase()
                              .includes(input.toLowerCase());
                          }}
                        >
                          {colors.map((color) => (
                            <Option key={color.id} value={color.id}>
                              <Space>
                                <div
                                  style={{
                                    width: 16,
                                    height: 16,
                                    backgroundColor: color.hex,
                                    border: '1px solid #ddd',
                                    borderRadius: 4,
                                    display: 'inline-block',
                                  }}
                                />
                                {color.name}
                              </Space>
                            </Option>
                          ))}
                        </Select>
                      </Col>
                      <Col xs={24} md={8}>
                        <Select
                          placeholder="انتخاب سایز"
                          value={variant.size_id || undefined}
                          onChange={(value) => updateVariant(index, 'size_id', value)}
                          loading={sizesLoading}
                          showSearch
                          filterOption={(input, option) => {
                            const label = option?.label || option?.children;
                            return String(label || '')
                              .toLowerCase()
                              .includes(input.toLowerCase());
                          }}
                        >
                          {sizes.map((size) => (
                            <Option key={size.id} value={size.id}>
                              {size.name}
                            </Option>
                          ))}
                        </Select>
                      </Col>
                      <Col xs={24} md={6}>
                        <InputNumber
                          className="w-full"
                          placeholder="موجودی"
                          value={variant.stock}
                          onChange={(value) => updateVariant(index, 'stock', value || 0)}
                          min={0}
                        />
                      </Col>
                      <Col xs={24} md={2}>
                        {variants.length > 0 && (
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeVariant(index)}
                          />
                        )}
                      </Col>
                    </Row>
                  ))}
                  <Button type="dashed" icon={<PlusOutlined />} onClick={addVariant} block>
                    افزودن موجودی (رنگ + سایز)
                  </Button>
                </Space>
              </Card>
            </Col>

            {/* Features */}
            <Col xs={24}>
              <Card title="ویژگی‌ها" className="mb-4">
                <Space direction="vertical" size="middle" className="w-full">
                  {features.map((feature, index) => (
                    <Space key={index} className="w-full">
                      <Input
                        placeholder="ویژگی محصول"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1"
                      />
                      {features.length > 1 && (
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeFeature(index)}
                        />
                      )}
                    </Space>
                  ))}
                  <Button type="dashed" icon={<PlusOutlined />} onClick={addFeature} block>
                    افزودن ویژگی
                  </Button>
                </Space>
              </Card>
            </Col>

            {/* Specs */}
            <Col xs={24}>
              <Card title="مشخصات فنی" className="mb-4">
                <Space direction="vertical" size="middle" className="w-full">
                  {specs.map((spec, index) => (
                    <Row key={index} gutter={8} align="middle">
                      <Col xs={10}>
                        <Input
                          placeholder="نام مشخصه"
                          value={spec.key}
                          onChange={(e) => updateSpec(index, 'key', e.target.value)}
                        />
                      </Col>
                      <Col xs={12}>
                        <Input
                          placeholder="مقدار"
                          value={spec.value}
                          onChange={(e) => updateSpec(index, 'value', e.target.value)}
                        />
                      </Col>
                      <Col xs={2}>
                        {specs.length > 1 && (
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeSpec(index)}
                          />
                        )}
                      </Col>
                    </Row>
                  ))}
                  <Button type="dashed" icon={<PlusOutlined />} onClick={addSpec} block>
                    افزودن مشخصه
                  </Button>
                </Space>
              </Card>
            </Col>

            {/* Submit Buttons */}
            <Col xs={24}>
              <Card>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    loading={updateProductMutation.isPending}
                    size="large"
                  >
                    ذخیره تغییرات
                  </Button>
                  <Button onClick={() => router.push('/admin/products')} size="large">
                    انصراف
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </Form>
      </Space>
    </div>
  );
}
