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
import { removeVendor, saveVendor, searchVendors } from "./VendorApi";
import Vendor from "./Vendor";

const VendorList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [proveedores, setProveedores] = useState<Vendor[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchVendors();
    setProveedores(result);
  };

  const remove = async (id: string) => {
    await removeVendor(id);
    search();
  };

  const addVendor = () => {
    history.push("vendor/new");
  };

  const editVendor = (id: string) => {
    history.push("vendor/" + id);
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
          <IonTitle>Gestion de Proveedores</IonTitle>
          <IonItem>
            <IonButton
              onClick={addVendor}
              shape="round"
              slot="end"
              fill="outline"
            >
              <IonIcon icon={add} />
              Agregar Proveedores
            </IonButton>
          </IonItem>
          <IonGrid className="table">
            <IonRow>
              <IonCol>Nombre</IonCol>
              <IonCol>Web</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Telefono</IonCol>
              <IonCol>Direccion</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>

            {proveedores.map((proveedor: Vendor) => (
              <IonRow>
                <IonCol>{proveedor.name}</IonCol>
                <IonCol>{proveedor.web}</IonCol>
                <IonCol>{proveedor.email}</IonCol>
                <IonCol>{proveedor.phone}</IonCol>
                <IonCol>{proveedor.address}</IonCol>
                <IonCol>
                  <IonButton
                    color="tertiary"
                    shape="round"
                    size="small"
                    fill="outline"
                    onClick={() => editVendor(String(proveedor.id))}
                  >
                    <IonIcon icon={pencil} />
                  </IonButton>
                  <IonButton
                    color="danger"
                    shape="round"
                    size="small"
                    fill="outline"
                    onClick={() => remove(String(proveedor.id))}
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

export default VendorList;
