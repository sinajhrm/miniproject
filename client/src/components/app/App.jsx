// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo } from 'react'
import './App.css'
import Login from '../login/login'
import ConvertCurrency from '../convertCurrency/ConvertCurrency'
import AddCurrency from '../addCurrency/AddCurrency'
import DeleteCurrency from '../deleteCurrency/DeleteCurrency'
import UpdateCurrency from '../updateCurrency/UpdateCurrency'
import Collapsible from '../Collapsible/Collapsible'

import CountryService from '../../api/services/CountryService.js'
import CurrencyService from '../../api/services/CurrencyService.js'

function App() {
	const [currenciesNeedsReloading, setCurrenciesNeedReloading] = useState(true);
	const [currencies, setCurrencies] = useState([]);

	const [countriesNeedsReloading, setCountriesNeedsReloading] = useState(true);
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		async function fetchCountries() {
			if (countriesNeedsReloading) {
				let fetched_countries = await CountryService.GetAllCountries();
				setCountries(fetched_countries);
				setCountriesNeedsReloading(false);
			}
			console.log(countries)
		}
		async function fetchCurrencies() {
			if (currenciesNeedsReloading) {
				let fetched_currencies = await CurrencyService.GetAllCurrencies();
				setCurrencies(fetched_currencies);
				setCurrenciesNeedReloading(false);
			}
			console.log(currencies)
		}

		fetchCountries();
		fetchCurrencies();
		return;
	}, [countries, countriesNeedsReloading, currencies, currenciesNeedsReloading])

	return (
		<>
			<div className='container'>
				<Collapsible title='Login'>
					<Login />
				</Collapsible>
				<Collapsible title='Convert'>
					<ConvertCurrency />
				</Collapsible>
				<Collapsible title='Add'>
					<AddCurrency />
				</Collapsible>
				<Collapsible title='Delete'>
					<DeleteCurrency />
				</Collapsible>
				<Collapsible title='Update'>
					<UpdateCurrency />
				</Collapsible>
			</div>
		</>
	)
}

export default App
