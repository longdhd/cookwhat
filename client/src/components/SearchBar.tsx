import useAutocomplete, { AutocompleteGetTagProps } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Collapse } from '@mui/material';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import { Schema } from 'mongoose';
import { KeyboardEvent, useState } from 'react';
import { Ingredient } from '../models';
import SearchIcon from '@mui/icons-material/Search';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const Root = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
  font-size: 14px;

  > div > button {
    background: #8F030C;
    transition: background 0.4s ease-in;
    width: 480px;
    text-transform: capitalize;
    cursor: default;
      &:hover {
        background: #8F030C;
      }

      @media only screen and (max-width: 412px){
        width: 360px;
      }
  }
`,
);

const Label = styled('label')`
  line-height: 1.5;
  display: block;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
`;

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 480px;
  // border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  // flex-wrap: wrap;
  margin-top: 12px;

  @media only screen and (max-width: 412px){
    width: 360px;
  }

  &:hover {
    // border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#8F030C'};
  }

  &.focused {
    // border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#8F030C'};
    // box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
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

  & button:hover  {
    background-color: transparent;
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
  margin: -4px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  @media only screen and (max-width: 412px){
    width: 360px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #8F030C;
    border: 4px solid transparent;
    border-radius: 8px;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar {
    width: 16px;
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
  onSearch?: (ingredientArr: Ingredient[]) => void
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
    disableCloseOnSelect: true
  });
  const [ingredients, setIngredients] = useState<Ingredient[]>();
  const Suggestion = () => {
    return (
      // <Slide timeout={300} direction="up" in={focused} mountOnEnter unmountOnExit>
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
      // </Slide>
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
    if (ingredients) {
      onSearch?.(ingredients);
    }
  }

  return (
    <Root>
      <div {...getRootProps()}>
        <Button>
          <Label {...getInputLabelProps()} sx={{
            fontSize:{
              xs: 16,
              md: '1.5rem'
            },
            letterSpacing: 2
          }}>Find Recipes By Ingredients</Label>
        </Button>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option: Ingredient, index: number) => (
            <StyledTag label={option.title} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} placeholder={!focused && value.length < 1 ? 'beef, beans, veggies etc.' : ''} onKeyDown={handleEnterDown} />
          <Button onClick={handleSubmit}><SearchIcon sx={{ color: '#8F030C' }} /></Button>
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ?
        <Suggestion />
        : null}
    </Root>
  );
}