import { useEffect, useRef } from "react";
import "./AddUserForm.scss";

export const AddUserForm = ({setShowAddUserForm}) => {
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowAddUserForm(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // плавна прокрутка
    });
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [setShowAddUserForm])
  return (
    <div className="container-bg">
      <div className="add-user-form" ref={formRef}>
        <h2>Add User</h2>
      </div>
    </div>
  )
}