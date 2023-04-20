export interface IConvertedCurrencyThunk {
    from: string;
    to: string;
    amount: number;
    date?: string;
}

export interface ICurrencyFluctuationsThunk { 
    start_date: string,
    end_date: string,
    base?: string,
    symbols?: string 
}