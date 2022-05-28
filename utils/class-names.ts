export const classNames = (...classes: (false | null | undefined | string)[]) =>
  classes.filter(Boolean).join(' ')
