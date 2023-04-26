export function isBareSpecifier(specifier) {
  if (specifier.startsWith('.')) {
    return false
  }

  // is it an absolute url?
  try {
    new URL(specifier)
  } catch {
    // it's not!
    return true
  }

  return false
}
