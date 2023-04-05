import { faker } from "@faker-js/faker";
import React, { useMemo } from "react";
import Select from "react-select";

const StaticSelect = () => {
  const options = useMemo(() => new Array(10).fill(0).map((_, i) => ({
    value: i,
    label: faker.name.firstName("female"),
  })), [])

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={options[0]}
      onChange={option => console.log(option)}
      options={options}
    />
  );
};

export default StaticSelect;
