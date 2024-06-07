import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function FormCategorie({
    categories,
    selectedCategories,
    handleCheckboxChange,
}) {
    const handleChange = event => {
        const { name, checked } = event.target;
        handleCheckboxChange(name, checked);
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Catégories
            </button>
            <ul className="dropdown-menu">
                {Object.entries(categories).map(([name, label]) => (
                    <li key={name}>
                        <div className="form-check dropdown-item">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name={name}
                                id={`flexCheck${name}`}
                                checked={selectedCategories[name]}
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={`flexCheck${name}`}
                            >
                                {label}
                            </label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FormCategorie;
