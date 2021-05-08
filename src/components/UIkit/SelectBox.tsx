import React from "react";
import {InputLabel, MenuItem, FormControl, Select, makeStyles} from "@material-ui/core";

type SelectBoxPropsType = {
  label: string;
  required?: boolean;
  value: string;
  select: (value: string) => void;
  options: {
    id: string
    name: string
  }[]
}

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 128,
    width: '100%'
  }
})

export const SelectBox: React.VFC<SelectBoxPropsType> = (
  {
    label,
    required = true,
    value,
    select,
    options
  }) => {

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select required={required} value={value} onChange={(event) => select(event.target.value as string)}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}