import { CurrencyEnum } from "../../enums";

export function formatCurrency(amount: number, currency: CurrencyEnum = CurrencyEnum.UnitedStates) {
    const locale = currency === CurrencyEnum.UnitedStates ? 'en-US' : 
        currency === CurrencyEnum.UnitedKingdom ? 'en-GB' :
        currency === CurrencyEnum.Euro ? 'de-DE' : 
        currency === CurrencyEnum.Japan ? 'ja-JP' :
        currency === CurrencyEnum.Nigeria ? 'en-NG' :
        currency === CurrencyEnum.China ? 'zh-CN' : 'en-US'
    ;

    const formatted = new Intl.NumberFormat(locale, { 
        style: 'currency', 
        currency: currency, 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 2 
    }).format(amount)

    if (amount % 1 === 0) {
        return formatted.replace(/\.00$/, '')
    }
    
    return formatted;
}
