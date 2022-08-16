import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setAlert } from '../../../actions/alert';
import { createTechnicianlist } from '../../../actions/technicianlist';
import { setAlert } from '../../../actions/alert';

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: ''
  });

  const { name, email, phonenumber } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phonenumber) {
      dispatch(setAlert('Pease input informations.', 'warning'));
      return;
    }

    setLoading(true);
    const res = await dispatch(createTechnicianlist(formData));
    setLoading(false);
    if (res) {
      navigate('/admin/technicianlist/get');
    }
  };

  return (
    <div>
      <div className="n-container">
        <div className="flex justify-center">
          <Link to={'/'}>
            <img src="/img/logo.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline text-center">Create Technician List</h1>

        <div className="mt-20 max-w-[400px] m-auto">
          <form className="form" onSubmit={onSubmit}>
            <div>
              <p className="font-medium">Name</p>
              <input
                type={'text'}
                name="name"
                value={name}
                onChange={onChange}
                className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
              />
            </div>
            <div className="mt-4">
              <p className="font-medium">Email</p>
              <input
                type={'email'}
                name="email"
                value={email}
                onChange={onChange}
                className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
              />
            </div>
            <div className="mt-4">
              <p className="font-medium">Phone number</p>
              <input
                type={'text'}
                name="phonenumber"
                value={phonenumber}
                onChange={onChange}
                className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
              />
            </div>
            <div className="mt-10 flex justify-center gap-5">
              <Link to={'/admin/technicianlist/get'}>
                <button className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
                  Back
                </button>
              </Link>
              <input
                type="submit"
                disabled={isLoading}
                value={isLoading ? 'Loading' : 'Create'}
                className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
