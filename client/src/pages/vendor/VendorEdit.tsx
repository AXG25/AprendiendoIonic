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
import { removeVendor, saveVendor, searchVendorById, searchVendors } from "./VendorApi";
import Vendor from "./Vendor";

const VendorEdit: React.FC = () => {
  const { name } = useParams<any>();
  const [vendor, setVendor] = useState<Vendor>({});
  const history = useHistory()
  const routeMatch: any = useRouteMatch("/page/vendor/:id");
  const id = routeMatch?.params?.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id !== "new") {
      let result = await searchVendorById(id);
      setVendor(result);
    }
    /*  let result = searchEmployees();
    setClientes(result); */
  };

  const save = async () => {
    
    await saveVendor(vendor);
    history.push('/page/vendors')
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
            {id == "new" ? "Añadir proveedor" : `Editar proveedor ${id}`}
          </IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Nombre"
                  labelPlacement="floating"
                  placeholder="Escribe su nombre"
                  onIonChange={(e) => (vendor.name = String(e.detail.value))}
                  value={vendor.name}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Sitio Web"
                  labelPlacement="floating"
                  placeholder="Escribe su Sitio web"
                  onIonChange={(e) => (vendor.web = String(e.detail.value))}
                  value={vendor.web}
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
                  onIonChange={(e) => (vendor.email = String(e.detail.value))}
                  value={vendor.email}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Telefono"
                  labelPlacement="floating"
                  placeholder="Escribe su Telefono"
                  onIonChange={(e) => (vendor.phone = String(e.detail.value))}
                  value={vendor.phone}
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
                  onIonChange={(e) => (vendor.address = String(e.detail.value))}
                  value={vendor.address}
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

export default VendorEdit;
