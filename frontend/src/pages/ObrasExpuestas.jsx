import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getObrasExpuestas,
  createObraExpuesta,
  deleteObraExpuesta,
} from "../services/obrasExpuestas";
import { getObras } from "../services/obras";
import { getExposiciones } from "../services/exposiciones";

export default function ObrasExpuestas() {
  const [obrasExpuestas, setObrasExpuestas] = useState([]);
  const [obras, setObras] = useState([]);
  const [exposiciones, setExposiciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  // 🔄 Cargar datos desde el backend
  const loadData = async () => {
    try {
      setLoading(true);
      const [asignaciones, obrasData, exposData] = await Promise.all([
        getObrasExpuestas(),
        getObras(),
        getExposiciones(),
      ]);
      setObrasExpuestas(asignaciones);
      setObras(obrasData);
      setExposiciones(exposData);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🖋️ Crear nueva asignación
  const onSubmit = async (data) => {
    try {
      const response = await createObraExpuesta(data);

      if (response?.message === "Esta obra ya está asignada a esta exposición") {
        // ⚠️ Mostrar alerta de duplicado
        toast.error("⚠️ Esta obra ya está asignada a esa exposición");
        return;
      }

      toast.success("🖼️ Obra asignada correctamente");
      reset();
      loadData();
    } catch (error) {
      // 🔍 Si viene desde el backend con código 400
      if (error.response?.status === 400) {
        toast.error(error.response.data?.message || "Obra ya asignada a la exposición");
      } else {
        console.error(error);
        toast.error("Error al asignar la obra a la exposición");
      }
    }
  };


  // 🗑️ Eliminar asignación
  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta asignación?")) {
      try {
        await deleteObraExpuesta(id);
        toast.success("🗑️ Asignación eliminada correctamente");
        loadData();
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar la asignación");
      }
    }
  };

  // 👀 Helper para leer correctamente los datos con alias variables
  const getField = (item, path) => {
    try {
      return path
        .split(".")
        .reduce((acc, part) => acc?.[part] ?? acc?.[part.toLowerCase()], item);
    } catch {
      return "—";
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold text-primary">
        🎨 Gestión de Obras Expuestas
      </h2>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card border-0 shadow-sm p-4 mb-4"
      >
        <div className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label fw-semibold text-secondary">Obra</label>
            <select
              {...register("id_obra", { required: true })}
              className="form-select"
            >
              <option value="">Seleccione una obra...</option>
              {obras.map((obra) => (
                <option key={obra.id} value={obra.id}>
                  {obra.titulo} ({obra.tecnica})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-5">
            <label className="form-label fw-semibold text-secondary">
              Exposición
            </label>
            <select
              {...register("id_exposicion", { required: true })}
              className="form-select"
            >
              <option value="">Seleccione una exposición...</option>
              {exposiciones.map((expo) => (
                <option key={expo.id} value={expo.id}>
                  {expo.nombre} – {expo.lugar}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2 d-grid">
            <button className="btn btn-success fw-semibold">
              ➕ Agregar
            </button>
          </div>
        </div>
      </form>

      {/* TABLA */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <p className="text-center py-4 text-muted">Cargando datos...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-primary text-center">
                  <tr>
                    <th>#</th>
                    <th>Obra</th>
                    <th>Artista</th>
                    <th>Exposición</th>
                    <th>Lugar</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {obrasExpuestas.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-3 text-muted">
                        No hay asignaciones registradas.
                      </td>
                    </tr>
                  ) : (
                    obrasExpuestas.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{getField(item, "Obra.titulo")}</td>
                        <td>{getField(item, "Obra.Artista.nombre")}</td>
                        <td>{getField(item, "Exposicion.nombre")}</td>
                        <td>{getField(item, "Exposicion.lugar")}</td>
                        <td>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            <i className="bi bi-trash"></i> Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
