import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Table from '../../components/Table';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';
import returnStatus from '../../utils/returnStatus';
import Button from '../../components/Button';

import {
  Container,
  AnimationContainer,
  Header,
  Content,
  ContainerButtons,
} from './styles';

interface ListMaintenanceFormData {
  equipament_id: string;
  employee_id: string;
  maintenanceType_id: string;
  date: Date;
  equipament: ListEquipamentFormData;
  employee: ListEmployeeFormData;
  maintenanceTypes: ListMaintenanceypeFormData;
  value: number;
  id: string;
  status: string;
}

interface ListEquipamentFormData {
  id: string;
  name: string;
}

interface ListEmployeeFormData {
  name: string;
  id: string;
}

interface ListMaintenanceypeFormData {
  name: string;
  id: string;
}

interface IState {
  state: {
    id: string;
  };
}

interface CheckListMaintenance {
  id: string;
  status: string;
  checkListMaintenance: {
    name: string;
  };
}

const ListMaintenance: React.FC = () => {
  const location: IState = useLocation();
  const [status, setStatus] = useState('');
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [maintenances, setMaintenances] = useState<ListMaintenanceFormData[]>(
    [],
  );
  const [checkListMaintenances, setCheckListMaintenances] = useState<
    CheckListMaintenance[]
  >([]);

  if (typeof location.state === 'undefined') {
    history.push('/');
  }

  const handleLoadMaintenances = useCallback(async () => {
    const response = await api.get('/maintenances', {
      params: { id: location.state.id },
    });

    setStatus(response.data[0].status);

    setMaintenances(response.data);
  }, [location.state.id]);

  const handleLoadCheckList = useCallback(async () => {
    const response = await api.get('/maintenanceCheckList', {
      params: { maintenance_id: location.state.id },
    });

    setCheckListMaintenances(response.data);
  }, [location.state.id]);

  const handleUpdateRealizeMaintenance = useCallback(async () => {
    const response = await api.patch('/maintenances', {
      id: location.state.id,
      status: 'R',
    });

    if (response.status === 200) {
      handleLoadMaintenances();
      handleLoadCheckList();

      addToast({
        type: 'success',
        title: 'Status alterado!',
        description: 'Manutenção atualizada!',
      });
    }
  }, [
    location.state.id,
    handleLoadMaintenances,
    handleLoadCheckList,
    addToast,
  ]);

  const handleUpdateCancelMaintenance = useCallback(async () => {
    const response = await api.patch('/maintenances', {
      id: location.state.id,
      status: 'C',
    });

    if (response.status === 200) {
      handleLoadMaintenances();
      handleLoadCheckList();

      addToast({
        type: 'success',
        title: 'Status alterado!',
        description: 'Manutenção atualizada!',
      });
    }
  }, [
    location.state.id,
    handleLoadMaintenances,
    handleLoadCheckList,
    addToast,
  ]);

  const handleUpdateRealizeCheckList = useCallback(
    async idCheckList => {
      try {
        const response = await api.patch('/maintenanceCheckList', {
          maintenance_id: location.state.id,
          id: idCheckList,
          status: 'R',
        });

        if (!response || response.status !== 200) {
          addToast({
            type: 'error',
            title: 'Oops!',
            description: 'Um erro inesperado ocorreu!',
          });
        } else {
          handleLoadCheckList();

          addToast({
            type: 'success',
            title: 'Status alterado!',
            description: 'Manutenção atualizada!',
          });
        }
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Oops!',
          description: 'Um erro inesperado ocorreu!',
        });
      }
    },
    [location.state.id, handleLoadCheckList, addToast],
  );

  const handleUpdateCancelCheckList = useCallback(
    async idCheckList => {
      try {
        const response = await api.patch('/maintenanceCheckList', {
          maintenance_id: location.state.id,
          id: idCheckList,
          status: 'C',
        });

        if (!response || response.status !== 200) {
          addToast({
            type: 'error',
            title: 'Oops!',
            description: 'Um erro inesperado ocorreu!',
          });
        } else {
          handleLoadCheckList();

          addToast({
            type: 'success',
            title: 'Status alterado!',
            description: 'Manutenção atualizada!',
          });
        }
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Oops!',
          description: 'Um erro inesperado ocorreu!',
        });
      }
    },
    [location.state.id, handleLoadCheckList, addToast],
  );

  useEffect(() => {
    handleLoadMaintenances();
    handleLoadCheckList();
  }, [handleLoadMaintenances, handleLoadCheckList]);

  const handleSubmit = useCallback(
    async ({
      maintenanceType_id,
      date,
      employee_id,
      equipament_id,
    }: ListMaintenanceFormData) => {
      try {
        const response = await api.get('/maintenances', {
          params: { maintenanceType_id, date, employee_id, equipament_id },
        });

        setMaintenances(response.data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na pesquisa',
          description: 'Ocorreu um erro ao fazer a pesquisa, tente novamente',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Header>
              <Link to="/listMaintenance">
                <FiArrowLeft size={30} />
              </Link>
              <h1>Editar Manutenções</h1>
              {status === 'P' && (
                <ContainerButtons>
                  <Button
                    style={{
                      float: 'right',
                      width: '50%',
                      marginRight: '10px',
                    }}
                    type="button"
                    id="btnConcluir"
                    onClick={handleUpdateRealizeMaintenance}
                  >
                    Concluir
                  </Button>
                  <Button
                    style={{
                      float: 'right',
                      width: '50%',
                      background: '#ff002f',
                    }}
                    type="button"
                    id="btnConcluir"
                    onClick={handleUpdateCancelMaintenance}
                  >
                    Cancelar
                  </Button>
                </ContainerButtons>
              )}
            </Header>
            <hr />
            {maintenances.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th align="left">Data</th>
                    <th align="left">Item</th>
                    <th align="left">Tipo</th>
                    <th align="left">Funcionário</th>
                    <th align="left">Custo</th>
                    <th align="left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {maintenances.map(maintenance => (
                    <tr key={maintenance.id}>
                      <td>{formatDate(maintenance.date)}</td>
                      <td>{maintenance.equipament.name}</td>
                      <td>{maintenance.maintenanceTypes.name}</td>
                      <td>{maintenance.employee.name}</td>
                      <td>{formatValue(maintenance.value)}</td>
                      <td>{returnStatus(maintenance.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <hr />
            <br />
            {checkListMaintenances.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th align="left">Descrição</th>
                    <th align="left">Status</th>
                    <th align="left">Opções</th>
                  </tr>
                </thead>

                <tbody>
                  {checkListMaintenances.map(checkListMaintenance => (
                    <tr key={checkListMaintenance.id}>
                      <td>{checkListMaintenance.checkListMaintenance.name}</td>
                      <td>{returnStatus(checkListMaintenance.status)}</td>
                      <td>
                        {status === 'P' && checkListMaintenance.status === 'P' && (
                          <>
                            <Button
                              style={{ width: '40%', marginRight: '5px' }}
                              id="btnConcluirCheckList"
                              onClick={() =>
                                handleUpdateRealizeCheckList(
                                  checkListMaintenance.id,
                                )}
                            >
                              Concluir
                            </Button>
                            <Button
                              style={{ width: '40%', background: '#ff002f' }}
                              id="btnCancelarCheckList"
                              onClick={() =>
                                handleUpdateCancelCheckList(
                                  checkListMaintenance.id,
                                )}
                            >
                              Cancelar
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ListMaintenance;
