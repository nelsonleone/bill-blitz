import { CurrencyEnum } from "../../enums";

export const currencies = [
    {
        value: CurrencyEnum.UnitedStates,
        label: "US Dollar",
        icon: "https://flagcdn.com/w20/us.png"
    },
    {
        value: CurrencyEnum.Euro,
        label: "Euro",
        icon: "https://flagcdn.com/w20/eu.png"
    },
    {
        value: CurrencyEnum.Japan,
        label: "Japanese Yen",
        icon: "https://flagcdn.com/w20/jp.png"
    },
    {
        value: CurrencyEnum.China,
        label: "Chinese Yuan",
        icon: "https://flagcdn.com/w20/cn.png"
    },
    {
        value: CurrencyEnum.UnitedKingdom,
        label: "British Pound",
        icon: "https://flagcdn.com/w20/gb.png"
    },
    {
        value: CurrencyEnum.Nigeria,
        label: "Nigerian Naira",
        icon: "https://flagcdn.com/w20/ng.png"
    }
]

export function getCurrencyByValue(value: CurrencyEnum) {
    return currencies.find(currency => currency.value === value) || {
        value: CurrencyEnum.UnitedStates,
        label: "US Dollar",
        icon: "https://flagcdn.com/w20/us.png"
    }
}