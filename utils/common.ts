export const capitalizeString = (str: string): string => {
  if (!str) return '';

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red';
};

export const hasKey = (objCheck: object, objTarget: object) => {
  return Object.keys(objCheck).some((key) => Object.prototype.hasOwnProperty.call(objTarget, key));
};

export const contentTypeConverter = (contentType: object | undefined) => {
  if (!contentType) return [];
  return Object.keys(contentType).map((key) => ({
    id: contentType[key as keyof typeof contentType],
    en_name: key,
    ja_name: key,
  }));
};

export const trimObject = (obj: { [field: string | number]: string | number } | any): any => {
  if (!obj) return '';

  const result = { ...obj };

  Object.keys(obj).forEach((k: string) => {
    if (typeof obj[k] === 'string') {
      Object.assign(result, { [k]: obj[k].trim() });
    }
  });

  return result;
};

export const saveFile = (data: any): any => {
  const type = data.headers.get('content-type');
  let newName = data.headers.get('content-disposition');
  if (newName.includes('=')) {
    newName = newName.split('=')[1];
  }
  const url = window.URL.createObjectURL(new Blob([data.data], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${newName}`);
  document.body.appendChild(link);
  link.click();
  link?.parentNode?.removeChild(link);
};
