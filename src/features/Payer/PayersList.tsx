import { useAppSelector } from '../../app/hooks'
import { PayerProps } from '../../types/PayerProps';
import { GeneralList } from '../Utils/GeneralList';
import { Payer } from './Payer';

export const PayersList = () => {

  const {payers} = useAppSelector(({WhoPays}) => WhoPays);

  return (
    <GeneralList 
      itemOrPayers={payers}
      cb={(payer)=> <Payer payer={payer as PayerProps} />}
    />
  )
}
