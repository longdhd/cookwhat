import useAutocomplete, { AutocompleteGetTagProps } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import { Schema } from 'mongoose';
import { KeyboardEvent, useState } from 'react';
import { Ingredient } from '../models';
import SearchIcon from '@mui/icons-material/Search';

const Root = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
  font-size: 14px;
`,
);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  margin-bottom: 16px;
  font-size: 1.5rem;
  color: white;
`;

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 480px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 412px){
    width: 360px;
  }

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;

    ::placeholder,
    ::-webkit-input-placeholder {
      text-align: center;
      font-size: 14px;
    }
    :-ms-input-placeholder {
       text-align: center;
       font-size: 14px;
    }
  }

`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
    };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 480px;
  margin: 8px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  @media only screen and (max-width: 412px){
    width: 360px;
  }

  & li {
    padding: 5px 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg:first-of-type {
      color: green;
    }

    & svg:last-child {
      color: red;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }

    & svg:last-child:hover {
        color: currentColor;
    }
  }
`,
);

interface CustomizedHookProps {
  searchOptions: Ingredient[],
  onSearch?: (ingredientArr: Schema.Types.ObjectId[]) => void
}

export default function CustomizedHook({ searchOptions, onSearch }: CustomizedHookProps) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [],
    multiple: true,
    options: searchOptions,
    isOptionEqualToValue: (option, value) => option.title === value.title,
    getOptionLabel: (option) => option.title,
    onChange: (event, value) => handleChange(event, value),
  });
  const [ingredients, setIngredients] = useState<Ingredient[]>();

  const Suggestion = () => {
    return (
      <Slide timeout={300} direction="up" in={focused} mountOnEnter unmountOnExit>
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof searchOptions)
            //Render autocomplete list
            .map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.title}</span>
                <img src={option.img} height={50} width={50} style={{
                  objectFit: 'cover'
                }} alt={option.title} />
                {!value.includes(option) ? <CheckIcon fontSize="small" sx={{ marginLeft: 1 }} /> : <ClearIcon fontSize="small" sx={{ marginLeft: 1 }} />}
              </li>
            ))}
        </Listbox>
      </Slide>
    )
  }

  const handleChange = (event: React.SyntheticEvent<Element, Event>, value: Ingredient[]) => {
    event.preventDefault();
    setIngredients(value);
    console.log(value);
  }

  const handleEnterDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
    }
  }

  const handleSubmit = () => {
    const objectIdArr = ingredients?.map(item => item._id);
    if(objectIdArr){
      onSearch?.(objectIdArr);
    }
  }

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Tìm món ăn bằng nguyên liệu:</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option: Ingredient, index: number) => (
            <StyledTag label={option.title} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} placeholder={!focused && value.length < 1 ? 'thịt, đậu, rau củ etc.' : ''} onKeyDown={handleEnterDown} />
          <Button onClick={handleSubmit}><SearchIcon /></Button>
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ?
        <Suggestion />
        : null}
    </Root>
  );
}