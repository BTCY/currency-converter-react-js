import { IApiConvertedCurrency } from '../../api/exchange-rates-service.types';


interface IMetaInfo {
    result: IApiConvertedCurrency
}

const MetaInfo = ({
    result
}: IMetaInfo) => {
    return (
        <div className='d-flex justify-content-between text-uppercase bg-light text-secondary p-2 rounded'>
            <small>
                update date: {new Date(result.info.timestamp * 1000).toLocaleString()}
            </small>
            <a
                target='_blank'
                href='https://apilayer.com/marketplace/exchangerates_data-api'
                className='link-secondary text-decoration-none small'
                rel='noreferrer'
            >
                source
            </a>
        </div>
    )
};

export default MetaInfo;