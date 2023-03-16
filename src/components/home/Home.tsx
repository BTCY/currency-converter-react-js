import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
// import { getAllAvailableCurrencies } from '../../api/exchange-rates-service';

/**
 *   Home
 */

const Home = () => {

    // const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

    useEffect(() => {

        // getAllAvailableCurrencies()
        //     .then((res) => console.log(res))
        //     .catch((e) => console.log(e));
    });

    return (
        <>TODO</>
    );
}

export default Home;