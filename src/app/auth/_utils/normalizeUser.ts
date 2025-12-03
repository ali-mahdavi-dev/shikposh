export interface BackendUser {
  id: number | string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  is_admin?: boolean | string | number;
  is_superuser?: boolean | string | number;
}

export interface NormalizedUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar?: string;
  is_admin: boolean;
  is_superuser: boolean;
}

export const normalizeUser = (backendUser: BackendUser, phone: string): NormalizedUser => {
  // Handle is_admin
  let isAdminValue = false;
  const isAdmin: any = backendUser.is_admin;
  if (isAdmin === true || isAdmin === 'true' || isAdmin === 1 || isAdmin === '1') {
    isAdminValue = true;
  } else if (typeof isAdmin === 'string' && isAdmin.toLowerCase() === 'true') {
    isAdminValue = true;
  }

  // Handle is_superuser
  let isSuperuserValue = false;
  const isSuperuser: any = backendUser.is_superuser;
  if (
    isSuperuser === true ||
    isSuperuser === 'true' ||
    isSuperuser === 1 ||
    isSuperuser === '1'
  ) {
    isSuperuserValue = true;
  } else if (typeof isSuperuser === 'string' && isSuperuser.toLowerCase() === 'true') {
    isSuperuserValue = true;
  }

  return {
    id: String(backendUser.id),
    first_name: backendUser.first_name || '',
    last_name: backendUser.last_name || '',
    email: backendUser.email || '',
    phone: backendUser.phone || phone,
    avatar: backendUser.avatar,
    is_admin: isAdminValue,
    is_superuser: isSuperuserValue,
  };
};

