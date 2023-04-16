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
import { removeCustomer, saveCustomer, searchCustomers } from "./CustomerApi";
import Customer from "./Customer";

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clientes, setClientes] = useState<Customer[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchCustomers();
    setClientes(result);
  };

  const remove = async (id: string) => {
    await removeCustomer(id);
    search();
  };

  const addCustomer = () => {
    history.push("customer/new");
  };

  const editCustomer = (id: string) => {
    history.push("customer/" + id);
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
          <IonTitle>Gestion de Clientes</IonTitle>
          <IonItem>
            <IonButton
              onClick={addCustomer}
              shape="round"
              slot="end"
              fill="outline"
            >
              <IonIcon icon={add} />
              Agregar Clientes
            </IonButton>
          </IonItem>
          <IonGrid className="table">
            <IonRow>
              <IonCol>Nombre</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Telefono</IonCol>
              <IonCol>Direccion</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>

            {clientes.map((cliente: Customer) => (
              <IonRow>
                <IonCol>
                  {cliente.firstname} {cliente.lastname}
                </IonCol>
                <IonCol>{cliente.email}</IonCol>
                <IonCol>{cliente.phone}</IonCol>
                <IonCol>{cliente.address}</IonCol>
                <IonCol>
                  <IonButton
                    color="tertiary"
                    shape="round"
                    size="small"
                    fill="outline"
                    onClick={() => editCustomer(String(cliente.id))}
                  >
                    <IonIcon icon={pencil} />
                  </IonButton>
                  <IonButton
                    color="danger"
                    shape="round"
                    size="small"
                    fill="outline"
                    onClick={() => remove(String(cliente.id))}
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

export default CustomerList;
