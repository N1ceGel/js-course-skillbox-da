const isPasswordStrong = (password) => {
    const isLengthValid = password.length >= 4;
    const hasSpecialCharacter = password.includes("-") || password.includes("_");
  
    return isLengthValid && hasSpecialCharacter
      ? "Пароль надёжный"
      : "Пароль недостаточно надёжный";
  }
  
  console.log(isPasswordStrong("1234-"));
  console.log(isPasswordStrong("qwe_123"));
  console.log(isPasswordStrong("_-_"));
  console.log(isPasswordStrong("123456789"));