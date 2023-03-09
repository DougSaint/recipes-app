import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  // Ideia para controlar o tipo de conteudo que será exibido, meals/drinks
  const [showType, setShowType] = useState('');
  const [doneRecipesStorage, setDoneRecipesStorage] = useState([]);

  const contextValue = useMemo(
    () => ({ showType, setShowType, doneRecipesStorage, setDoneRecipesStorage }),
    [showType, setShowType, doneRecipesStorage, setDoneRecipesStorage],
  );

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
