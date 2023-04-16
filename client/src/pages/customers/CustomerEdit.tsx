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
  removeCustomer,
  saveCustomer,
  searchCustomerById,
  searchCustomers,
} from "./CustomerApi";
import Customer from "./Customer";

const CustomerEdit: React.FC = () => {
  const { name } = useParams<any>();
  const [customer, setCustomer] = useState<Customer>({});
  const routeMatch: any = useRouteMatch("/page/customer/:id");
  const id = routeMatch?.params?.id;
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id !== "new") {
      let result = await searchCustomerById(id);
      setCustomer(result);
    }
    /*  let result = searchCustomers();
    setClientes(result); */
  };

  const save = async () => {
    await saveCustomer(customer);
    history.push("/page/customers");
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
            {id == "new" ? "Añadir cliente" : `Editar cliente ${id}`}
          </IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Nombre"
                  labelPlacement="floating"
                  placeholder="Escribe tu nombre"
                  onIonChange={(e) =>
                    (customer.firstname = String(e.detail.value))
                  }
                  value={customer.firstname}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Apellido"
                  labelPlacement="floating"
                  placeholder="Escribe tu Apellido"
                  onIonChange={(e) =>
                    (customer.lastname = String(e.detail.value))
                  }
                  value={customer.lastname}
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
                  placeholder="Escribe tu Email"
                  type="email"
                  onIonChange={(e) => (customer.email = String(e.detail.value))}
                  value={customer.email}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Telefono"
                  labelPlacement="floating"
                  placeholder="Escribe tu Telefono"
                  onIonChange={(e) => (customer.phone = String(e.detail.value))}
                  value={customer.phone}
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
                  placeholder="Escribe tu Direccion"
                  onIonChange={(e) =>
                    (customer.address = String(e.detail.value))
                  }
                  value={customer.address}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
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

export default CustomerEdit;
