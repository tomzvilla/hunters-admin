import React from 'react'
import MoonLoader from "react-spinners/MoonLoader";
const Spinner = ({ loading }) => {
    return (
        <MoonLoader
            color='#1976d2'
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default Spinner;