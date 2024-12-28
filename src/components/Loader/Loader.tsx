import { Circles } from "react-loader-spinner"
import s from './Loader.module.css'

const Loader: React.FC = () => {
  return (
    <div className={s.loader}>
       <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}

export default Loader
