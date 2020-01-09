import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Switch, Fab, Dialog, DialogContent, DialogTitle, DialogActions, FormControlLabel,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { setHeaderTitle } from '../../../redux/header/header.actions';
import FormInput from '../../components/form-input/form-input.component';

import { FooterContent, SaveButton } from './courses.styles';

const CoursesPage = () => {
  const INITIAL_DATA = {
    name: '',
    active: true,
  };
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState(INITIAL_DATA);
  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'Cursos', subtitle: 'Metodista Ensino' }));
  }, [dispatch]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCourse({ ...course, [name]: value });
  };
  const handleAdd = () => {
    setCourse(INITIAL_DATA);
    setTitle('Adicionar Curso');
    setShowDialog(true);
  };

  return (
    <div>
      <FooterContent>
        <Fab color="primary" aria-label="add" onClick={handleAdd}>
          <AddIcon />
        </Fab>
      </FooterContent>
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <form onSubmit={() => {}}>
            <FormInput
              label="Nome"
              name="name"
              value={course.name}
              handleChange={handleChange}
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={course.active}
                  value={course.active}
                  onChange={() => setCourse({ ...course, active: !course.active })}
                />
            )}
              label={course.active ? 'Ativo' : 'Inativo'}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <SaveButton>Salvar</SaveButton>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default CoursesPage;
