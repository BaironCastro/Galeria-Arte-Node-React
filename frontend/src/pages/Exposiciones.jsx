import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getExposiciones,
  createExposicion,
  updateExposicion,
  deleteExposicion,
} from "../services/exposiciones";

export default function Exposiciones() {
  const [exposiciones, setExposiciones] = useState([]);
  const [editId, setEditId] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Cargar exposiciones
  const loadExposiciones = async () => {
    try {
      const data = await getExposiciones();
      setExposiciones(data);
    } catch {
      toast.error("Error al cargar las exposiciones");
    }
  };

  useEffect(() => {
    loadExposiciones();
  }, []);

  // Crear o actualizar
  const onSubmit = async (data) => {
    try {
      if (editId) {
        await updateExposicion(editId, data);
        toast.success("🏛️ Exposición actualizada correctamente");
      } else {
        await createExposicion(data);
        toast.success("🖼️ Exposición agregada correctamente");
      }
      reset();
      setEditId(null);
      loadExposiciones();
    } catch {
      toast.error("Error al guardar la exposición");
    }
  };

  const handleEdit = (expo) => {
    setEditId(expo.id);
    setValue("nombre", expo.nombre);
    setValue("lugar", expo.lugar);
    setValue("fecha_inicio", expo.fecha_inicio?.split("T")[0]);
    setValue("fecha_fin", expo.fecha_fin?.split("T")[0]);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar esta exposición?")) {
      try {
        await deleteExposicion(id);
        toast.success("🗑️ Exposición eliminada correctamente");
        loadExposiciones();
      } catch {
        toast.error("Error al eliminar la exposición");
      }
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-dark fw-bold">🏛️ Gestión de Exposiciones</h1>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card border-0 shadow-sm p-3 mb-4"
      >
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              {...register("nombre", { required: "El nombre es obligatorio" })}
              placeholder="Nombre"
              className="form-control"
            />
            {errors.nombre && (
              <small className="text-danger">{errors.nombre.message}</small>
            )}
          </div>
          <div className="col-md-3">
            <input
              type="text"
              {...register("lugar")}
              placeholder="Lugar"
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              {...register("fecha_inicio", { required: "La fecha de inicio es obligatoria" })}
              className="form-control"
            />
            {errors.fecha_inicio && (
              <small className="text-danger">{errors.fecha_inicio.message}</small>
            )}
          </div>
          <div className="col-md-2">
            <input
              type="date"
              {...register("fecha_fin", { required: "La fecha de fin es obligatoria" })}
              className="form-control"
            />
            {errors.fecha_fin && (
              <small className="text-danger">{errors.fecha_fin.message}</small>
            )}
          </div>
          <div className="col-md-2 text-center">
            <button className="btn btn-primary w-100">
              {editId ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </div>
      </form>

      {/* TABLA */}
      <div className="table-responsive shadow-sm">
        <table className="table table-hover align-middle shadow-sm">
          <thead className="table-primary text-center">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Lugar</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {exposiciones.map((expo) => (
              <tr key={expo.id}>
                <td>{expo.id}</td>
                <td>{expo.nombre}</td>
                <td>{expo.lugar}</td>
                <td>{new Date(expo.fecha_inicio).toLocaleDateString()}</td>
                <td>{new Date(expo.fecha_fin).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleEdit(expo)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(expo.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
