type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, unknown>;

/**
 * Conditionally join class names together
 * Similar to the popular `classnames` or `clsx` libraries
 */
export const classNames = (...classes: ClassValue[]): string => {
  return classes
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim();
};

/**
 * Alternative function name (cn is commonly used with tailwind)
 */
export const cn = classNames;
