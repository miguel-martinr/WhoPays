import { useAppSelector } from '../../app/hooks'
import { Payer } from './Payer';

export const PayersList = () => {

  const {payers} = useAppSelector(({WhoPays}) => WhoPays);

  return (
    <>
      {
        payers.map(payer => 
          <div key={payer.id}>
            <Payer
              payer={payer}
            />
          </div>  
        )
      }
    </>
  )
}
