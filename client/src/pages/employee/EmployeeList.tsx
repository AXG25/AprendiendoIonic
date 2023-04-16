import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import { add, pencil, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { removeEmployee, saveEmployee, searchEmployees } from "./EmployeeApi";
import Employee from "./Employee";

const EmployeeList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [empleados, setEmpleados] = useState<Employee[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchEmployees();
    setEmpleados(result);
  };

  const remove = async (id: string) => {
    await removeEmployee(id);
    search();
  };

  const addEmployee = () => {
    history.push("employee/new");
  };

  const editEmployee = (id: string) => {
    history.push("employee/" + id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonTitle>Gestion de Empleados</IonTitle>
          <IonItem>
            <IonButton
              onClick={addEmployee}
              shape="round"
              slot="end"
              fill="outline"
            >
              <IonIcon icon={add} />
              Agregar Empleados
            </IonButton>
          </IonItem>
          <IonGrid className="table">
            <IonRow>
              <IonCol>Nombre</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Telefono</IonCol>
              <IonCol>Direccion</IonCol>
              <IonCol>Salario</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>

            {empleados.map((empleado: Employee) => (
              <IonRow>
                <IonCol>
                  {empleado.firstname} {empleado.lastname}
                </IonCol>
                <IonCol>{empleado.email}</IonCol>
                <IonCol>{empleado.phone}</IonCol>
                <IonCol>{empleado.address}</IonCol>
                <IonCol>{empleado.salary}</IonCol>
                <IonCol>
                  <IonButton
                    color="tertiary"
                    shape="round"
                    size="small"
                    fill="outline"
                    onClick={() => editEmployee(String(empleado.id))}
                  >
                    <IonIcon icon={pencil} />
                  </IonButton>
                  <IonButton
                    color="danger"
                    shape="round"
                    size="small"
                    fill="outline"
                    onClick={() => remove(String(empleado.id))}
                  >
                    <IonIcon icon={trash} />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeList;
