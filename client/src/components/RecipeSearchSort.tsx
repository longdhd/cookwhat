import { SearchOutlined } from '@mui/icons-material';
import { Box, FormControl, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';
import { ListParams } from '../models';

export interface RecipeSearchSortProps {
    onSearchChange: (filter: ListParams) => void,
    onSortChange: (filter: ListParams) => void,
    filter: ListParams,
}

export default function RecipeSearchSort({ filter, onSearchChange, onSortChange }: RecipeSearchSortProps) {
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
    return (
        <div>
            <Box>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={6}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="name-search">Search by name</InputLabel>
                            <Input id="name-search" endAdornment={<SearchOutlined />} onChange={handleSearchChange} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} md={2}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel id="sort-select">Sort</InputLabel>
                            <Select labelId="sort-select" onChange={handleSortChange}>
                                <MenuItem value="updatedAt.1">Latest</MenuItem>
                                <MenuItem value="updatedAt.-1">Newest</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
