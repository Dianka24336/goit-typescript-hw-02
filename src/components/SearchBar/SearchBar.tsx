import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import s from './SearchBar.module.css'

interface SearchBarProps {
  onChangeQuery: (query: string) => void; //нагадування:FormEvent не використ бо Formik сам типізує як тре
}

const Searchbar: React.FC<SearchBarProps> = ({onChangeQuery}) => {
  const initialValues = {
    query: "",
  };
  const handleSubmit = (values:{query: string}, options:any) => {
    if (!values.query.trim()) {
        toast.error("Please enter a search object!");
        return;
      }
    console.log(values);
    onChangeQuery(values.query)
    options.resetForm();

  };
  return (
    <div className={s.header}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <Field className={s.input}
            name="query"
            type="text"
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
          
        </Form>
      </Formik>
    </div>
  );
};

export default Searchbar;
