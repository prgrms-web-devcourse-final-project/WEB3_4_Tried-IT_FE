export const enumsRepository: Map<string, string[]> = new Map();

export const generateTitle = (title: string) => {
  if (!enumsRepository.has(title)) {
    return title;
  }
  return generateTitle(
    `${title.replace(/\d/g, '')}${getNumberFromString(title) + 1}`,
  );
};

export const getNumberFromString = (str: string) => {
  return Number(str.match(/\d+/g)?.[0]) || 0;
};
