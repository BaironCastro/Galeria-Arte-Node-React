import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getObras,
  createObra,
  updateObra,
  deleteObra,
} from "../services/obras";

export default function Obras() {
  const [obras, setObras] = useState([]);
  const [editId, setEditId] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  // Cargar todas las obras
  const loadObras = async () => {
    try {
      const data = await getObras();
      setObras(data);
    } catch {
      toast.error("Error al cargar las obras");
    }
  };

  useEffect(() => {
    loadObras();
  }, []);

  // Crear o actualizar
  const onSubmit = async (data) => {
    try {
      if (editId) {
        await updateObra(editId, data);
        toast.success("🎨 Obra actualizada correctamente");
      } else {
        await createObra(data);
        toast.success("🖼️ Obra agregada correctamente");
      }
      reset();
      setEditId(null);
      loadObras();
    } catch {
      toast.error("Error al guardar la obra");
    }
  };

  const handleEdit = (obra) => {
    setEditId(obra.id);
    setValue("titulo", obra.titulo);
    setValue("anio", obra.anio);
    setValue("tecnica", obra.tecnica);
    setValue("id_artista", obra.id_artista);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar esta obra?")) {
      try {
        await deleteObra(id);
        toast.success("🗑️ Obra eliminada correctamente");
        loadObras();
      } catch {
        toast.error("Error al eliminar la obra");
      }
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🖼️ Gestión de Obras</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit(onSubmit)} className="card p-3 mb-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              {...register("titulo", { required: true })}
              placeholder="Título"
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              {...register("anio", { required: true })}
              placeholder="Año"
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              {...register("tecnica")}
              placeholder="Técnica"
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              {...register("id_artista", { required: true })}
              placeholder="ID Artista"
              className="form-control"
            />
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
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Año</th>
              <th>Técnica</th>
              <th>ID Artista</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {obras.map((obra) => (
              <tr key={obra.id}>
                <td>{obra.id}</td>
                <td>{obra.titulo}</td>
                <td>{obra.anio}</td>
                <td>{obra.tecnica}</td>
                <td>{obra.id_artista}</td>
                <td>
                  <button
                    onClick={() => handleEdit(obra)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(obra.id)}
                    className="btn btn-danger btn-sm"
                  >
                    🗑️ Eliminar
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
