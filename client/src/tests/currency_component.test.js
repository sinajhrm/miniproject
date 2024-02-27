/**
 * Before we begin, we need to setup the environment to run React tests:
 * 1- run the following command: npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @babel/preset-env @babel/preset-react
 * 2- In the root directory of the client folder, create a new file and name it ".babelrc"
 * 3- Add the following content to the file: 
 *      {
            "presets": [
                "@babel/preset-env",
                ["@babel/preset-react", { "runtime": "automatic" }]
            ]
        }
 * 4- In package.json, add the following at the end of the file (before the last } bracket):
        ,"jest": {
            "testEnvironment": "jsdom"
        }
 *******       
 * Necessary import:
 */
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import convertCurrencyFunc from '../utils/currency_utils'

// Source: https://github.com/testing-library/react-testing-library/issues/683#issuecomment-646855625
import { configure } from '@testing-library/dom'
configure({ testIdAttribute: 'id' })

/**
 * Import all the related component(s) here:
 * 
 * 
 */
import ConvertCurrency from '../components/convertCurrency/ConvertCurrency'
import * as Types from "../utils/types";
// import { act } from "react-dom/test-utils";

/**
 * we will test the conversion section that contains: currency code & amount input fields, 
 *   Convert button and converted amount text. 
 * You need to do write one unit test that ensure the functionality of the section is working as intended.
 * We need to test that the user will be able to type into the input fields then click the Convert button.
 * Once the button is clicked, the conversion amount should be displayed on the screen.
 */

it('Should call currency conversion mock callback with correct arguments', async () => {
    //Arrange
    // convertCurrency is a mock function now
    const convertCurrency = jest.fn(() => 100);

    const user = userEvent.setup();
    const conversionAmount = 100;

    const available_currencies =
        [
            {
                id: 1,
                countryId: 1,
                currencyCode: "CAD",
                conversionRate: 1
            },
            {
                id: 2,
                countryId: 2,
                currencyCode: "USD",
                conversionRate: 0.74
            }
        ]

    // Act
    // Your code here
    const { debug } =
        render(
            <ConvertCurrency
                available_currencies={available_currencies}
                currencyConvertCallback={convertCurrency}
            />)

    // debug()

    const submitBtn = screen.getByTestId('btnSubmit');

    const cbxCurrencyOptions = screen.getByTestId('cbxCurrencyOptions')
    const txtConversionAmount = screen.getByTestId('txtAmount')
    const lblResult = screen.getByTestId('lblResult')

    await user.selectOptions(cbxCurrencyOptions, screen.getByText('USD'))
    await user.type(txtConversionAmount, conversionAmount.toString())
    await user.click(submitBtn)

    // Expect
    expect(convertCurrency).toHaveBeenCalledTimes(1);
    expect(convertCurrency.mock.calls[0][0].conversionRate).toBe(available_currencies[1].conversionRate.toString())
});
it('Should perform a conversion based on the selected currency and show it in the correct field (with actual conversion)', async () => {
    // Arrange
    // convertCurrency is a mock function now
    const convertCurrency = jest.fn();
    const user = userEvent.setup();
    const conversionAmount = 100;

    const available_currencies =
        [
            {
                id: 1,
                countryId: 1,
                currencyCode: "CAD",
                conversionRate: 1
            },
            {
                id: 2,
                countryId: 2,
                currencyCode: "USD",
                conversionRate: 0.74
            }
        ]

    // Act
    const { debug } =
        render(
            <ConvertCurrency
                available_currencies={available_currencies}
                currencyConvertCallback={convertCurrencyFunc}
            />)

    const submitBtn = screen.getByTestId('btnSubmit');

    const cbxCurrencyOptions = screen.getByTestId('cbxCurrencyOptions')
    const txtConversionAmount = screen.getByTestId('txtAmount')
    const lblResult = screen.getByTestId('lblResult')

    await user.selectOptions(cbxCurrencyOptions, screen.getByText('USD'))
    await user.type(txtConversionAmount, conversionAmount.toString())
    await user.click(submitBtn)

    // Expect
    expect(+lblResult.value)
        .toBe
        (
            +convertCurrencyFunc
                (
                    { conversionRate: +screen.getByTestId('cbxCurrencyOptions').value },
                    { conversionRate: 1 },
                    conversionAmount
                ).toFixed(2)
        )
});
