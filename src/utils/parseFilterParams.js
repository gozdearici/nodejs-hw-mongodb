const parseBoolean = (value) => {
  if (typeof value !== 'string') return undefined;

  const lower = value.toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;

  return undefined;
};

export const parseFilterParams = (query) => {
  const { isFavourite } = query;

  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    isFavourite: parsedIsFavourite,
  };
};
