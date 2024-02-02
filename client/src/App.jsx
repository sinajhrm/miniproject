// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'
import Login from './components/login/login'
import ConvertCurrency from './components/convertCurrency/ConvertCurrency'
import AddCurrency from './components/addCurrency/AddCurrency'
import DeleteCurrency from './components/deleteCurrency/DeleteCurrency'
import UpdateCurrency from './components/updateCurrency/UpdateCurrency'

function App() {

	// console.log(await CurrencyService.GetAllCurrencies());

	return (
		<>
			<div className='container'>
				<Login />
				<ConvertCurrency />
				<AddCurrency />
				<DeleteCurrency />
				<UpdateCurrency />
			</div>
		</>
	)
}

export default App
