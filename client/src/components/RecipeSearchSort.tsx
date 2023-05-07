import { SearchOutlined } from '@mui/icons-material';
import { Box, FormControl, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Button } from '@mui/material';
import { ChangeEvent, useRef } from 'react';
import { ListParams } from '../models';

export interface RecipeSearchSortProps {
    onSearchChange: (filter: ListParams) => void,
    onSortChange: (filter: ListParams) => void,
    filter: ListParams,
}

export default function RecipeSearchSort({ filter, onSearchChange, onSortChange }: RecipeSearchSortProps) {
    const inputRef = useRef<HTMLInputElement>();
    const selectRef = useRef<HTMLSelectElement>();
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFilter = { ...filter, title_like: e.target.value || undefined };
        onSearchChange(newFilter);
    }
    const handleSortChange = (e: SelectChangeEvent) => {
        const value = e.target.value;
        const [sort, order] = value.split('.');
        const newFilter = {
            ...filter,
            _sort: sort,
            _order: Number(order)
        }
        onSortChange(newFilter);
    }
    const handleClear = () => {

        const newFilter = {
            ...filter,
            _sort: undefined,
            _order: undefined,
            title_like: undefined,
        }

        onSortChange(newFilter);

        if (inputRef.current && selectRef.current) {
            inputRef.current.value = '';
            selectRef.current.value = 'updatedAt.1';
        }
    }
    return (
        <div>
            <Box>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid item sm={12} md={8}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="name-search">Search by name</InputLabel>
                            <Input id="name-search" endAdornment={<SearchOutlined />} onChange={handleSearchChange} inputRef={inputRef} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} md={2}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel id="sort-select">Sort</InputLabel>
                            <Select labelId="sort-select" onChange={handleSortChange} ref={selectRef} value={filter._sort ? `${filter._sort}.${filter._order}` : ''}>
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="updatedAt.1">Latest</MenuItem>
                                <MenuItem value="updatedAt.-1">Newest</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} md={2}>
                        <Button fullWidth onClick={handleClear}>Clear</Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
