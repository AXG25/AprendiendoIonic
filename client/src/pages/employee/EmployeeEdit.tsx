import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import { add, checkmark, pencil, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import {
  removeEmployee,
  saveEmployee,
  searchEmployeeById,
  searchEmployees,
} from "./EmployeeApi";
import Employee from "./Employee";

const EmployeeEdit: React.FC = () => {
  const { name } = useParams<any>();
  const [employee, setEmployee] = useState<Employee>({});
  const history = useHistory();
  const routeMatch: any = useRouteMatch("/page/employee/:id");
  const id = routeMatch?.params?.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id !== "new") {
      let result = await searchEmployeeById(id);
      setEmployee(result);
    }
    /*  let result = searchEmployees();
    setClientes(result); */
  };

  const save =async () => {
    await saveEmployee(employee);
    history.push("/page/employees");
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
          <IonTitle>
            {id == "new" ? "Añadir empleado" : `Editar empleado ${id}`}
          </IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Nombre"
                  labelPlacement="floating"
                  placeholder="Escribe su nombre"
                  onIonChange={(e) =>
                    (employee.firstname = String(e.detail.value))
                  }
                  value={employee.firstname}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Apellido"
                  labelPlacement="floating"
                  placeholder="Escribe su Apellido"
                  onIonChange={(e) =>
                    (employee.lastname = String(e.detail.value))
                  }
                  value={employee.lastname}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Email"
                  labelPlacement="floating"
                  placeholder="Escribe su Email"
                  type="email"
                  onIonChange={(e) => (employee.email = String(e.detail.value))}
                  value={employee.email}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Telefono"
                  labelPlacement="floating"
                  placeholder="Escribe su Telefono"
                  onIonChange={(e) => (employee.phone = String(e.detail.value))}
                  value={employee.phone}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Direccion"
                  labelPlacement="floating"
                  placeholder="Escribe su Direccion"
                  onIonChange={(e) =>
                    (employee.address = String(e.detail.value))
                  }
                  value={employee.address}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Salario"
                  labelPlacement="floating"
                  placeholder="Escribe su Salario"
                  onIonChange={(e) =>
                    (employee.salary = Number(e.detail.value))
                  }
                  value={employee.salary}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonItem>
            <IonButton
              onClick={save}
              color="tertiary"
              shape="round"
              slot="end"
              fill="outline"
            >
              <IonIcon icon={checkmark} />
              Listo
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeEdit;
