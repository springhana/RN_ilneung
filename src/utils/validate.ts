function isBlank(value: string) {
  return value.trim() === '';
}

function validateSearch(values: {title: string}) {
  const errors = {
    title: '',
  };

  if (isBlank(values.title)) {
    errors.title = '제목은 1~30자 이내로 입력해주세요.';
  }

  return errors;
}

function validateNickName(values: {name: string}) {
  const errors = {
    name: '',
  };

  if (isBlank(values.name)) {
    errors.name = '제목은 1~30자 이내로 입력해주세요.';
  }

  return errors;
}

function validateIntroduce(values: {introduce: string}) {
  const errors = {
    introduce: '',
  };

  if (isBlank(values.introduce)) {
    errors.introduce = '제목은 1~30자 이내로 입력해주세요.';
  }

  return errors;
}

export {validateSearch, validateNickName, validateIntroduce};
