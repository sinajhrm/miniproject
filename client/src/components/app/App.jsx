import React, { useState, useEffect, useMemo } from 'react'
import './App.css'

import convertCurrencyFunc from '../../utils/currency_utils.js'

import Login from '../login/Login'
import ConvertCurrency from '../convertCurrency/ConvertCurrency'
import AddCurrency from '../addCurrency/AddCurrency'
import DeleteCurrency from '../deleteCurrency/DeleteCurrency'
import UpdateCurrency from '../updateCurrency/UpdateCurrency'
import Collapsible from '../collapsible/Collapsible'
import AddCountry from '../addCountry/AddCountry.jsx'
import DeleteCountry from '../deleteCountry/DeleteCountry.jsx'

import CountryService from '../../api/services/CountryService.js'
import CurrencyService from '../../api/services/CurrencyService.js'

function App() {
	const [countriesNeedsReloading, setCountriesNeedReloading] = useState(true);
	const [countries, setCountries] = useState([]);

	const [currenciesNeedsReloading, setCurrenciesNeedReloading] = useState(true);
	const [currencies, setCurrencies] = useState([]);

	useEffect(() => {
		async function fetchCountries() {
			if (countriesNeedsReloading) {
				let fetched_countries = await CountryService.GetAllCountries();
				setCountries(fetched_countries);
				setCountriesNeedReloading(false);
			}
			// console.log(countries)
		}
		async function fetchCurrencies() {
			if (currenciesNeedsReloading) {
				let fetched_currencies = await CurrencyService.GetAllCurrencies();
				setCurrencies(fetched_currencies);
				setCurrenciesNeedReloading(false);
			}
			// console.log(currencies)
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
					<ConvertCurrency available_currencies={currencies} currencyConvertCallback={convertCurrencyFunc} />
				</Collapsible>
				<Collapsible title='Add Currency'>
					<AddCurrency available_countries={countries} currenciesUpdateTrigger={setCurrenciesNeedReloading} />
				</Collapsible>
				<Collapsible title='Add Country'>
					<AddCountry countriesUpdateTrigger={setCountriesNeedReloading} />
				</Collapsible>
				<Collapsible title='Delete Currency'>
					<DeleteCurrency available_currencies={currencies} currenciesUpdateTrigger={setCurrenciesNeedReloading} />
				</Collapsible>
				<Collapsible title='Delete Country'>
					<DeleteCountry available_countries={countries} countriesUpdateTrigger={setCountriesNeedReloading} />
				</Collapsible>
				<Collapsible title='Update'>
					<UpdateCurrency available_currencies={currencies} currenciesUpdateTrigger={setCurrenciesNeedReloading} />
				</Collapsible>
			</div>
		</>
	)
}

export default App
