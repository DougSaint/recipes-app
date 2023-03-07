import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFoodsOrDrinks,
  fetchCategories, filterMeals } from '../services/fetchRecipes';
import HeaderContext from '../context/HeaderContext';

function Drinks(props) {
  const { pathname } = props;
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState('');
  const { result } = useContext(HeaderContext);
  console.log('result::', result);

  useEffect(() => {
    const getRecipes = async () => {
      if (!isFiltered) {
        const response = await fetchFoodsOrDrinks('cocktail');
        setRecipes(response);
      }
    };
    getRecipes();

    const getCategories = async () => {
      const response = await fetchCategories('cocktail');
      setCategories(response);
    };
    getCategories();

    const filterByCategory = async () => {
      if (isFiltered) {
        const response = await filterMeals('cocktail', isFiltered);
        setRecipes(response);
      }
    };
    filterByCategory();
  }, [isFiltered]);

  const teste = (item) => {
    if (isFiltered === item) setIsFiltered('');
    else setIsFiltered(item);
  };

  console.log('filtered: ', recipes);

  useEffect(() => {
    const limit = 12;
    if (result.drinks !== undefined && result.drinks.length > 1) {
      const resultado = result.drinks?.filter((_, index) => index < limit);
      console.log('resultado', resultado);
      setRecipes(resultado);
    }
  }, [result, setRecipes]);

  return (
    <div>
      {categories.length > 0 && categories.map((item) => (
        <button
          data-testid={ `${item}-category-filter` }
          key={ item }
          onClick={ () => teste(item) }
        >
          {item}
        </button>))}
      <button
        data-testid="All-category-filter"
        onClick={ () => setIsFiltered('') }
      >
        All
      </button>

      <div>
        {recipes.length > 0 && recipes
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <Link
              to={ `${pathname}/${idDrink}` }
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <p data-testid={ `${index}-card-name` }>
                {strDrink}
              </p>
              <img
                src={ strDrinkThumb }
                alt="Foto de Comida"
                data-testid={ `${index}-card-img` }
              />
            </Link>))}

      </div>
    </div>
  );
}

Drinks.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Drinks;
