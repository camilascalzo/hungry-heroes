const makeOptions = (arr = [], name = 'name', value = 'id') => {
  const options = arr?.map((option) => {
    const item = {
      key: option?.[value] === 0 ? String(option?.[value]) : option?.[value] || option,
      label: option?.[name] || option,
      value: option?.[value] === 0 ? String(option?.[value]) : option?.[value] || option
    };
    return item;
  });
  return options;
};

const makeOptionsObject = (objectEnum, name = 'name', value = 'id') => {
  const keys = Object.keys(objectEnum);
  const arr = keys.map((keyInt) => ({ key: keyInt, ...objectEnum[keyInt] }));

  const options = makeOptions(arr, name, value);
  return options;
};

const formatPrice = (price) => {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-GB');
};

export {
  makeOptions,
	makeOptionsObject,
	formatDate,
	formatPrice
};

