import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = "http://localhost:3001/artistas";

export default function Artistas() {
  const [artistas, setArtistas] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const loadArtistas = async () => {
    try {
      const res = await axios.get(API_URL);
      setArtistas(res.data);
    } catch {
      toast.error("❌ Error al cargar artistas");
    }
  };

  useEffect(() => {
    loadArtistas();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, data);
        toast.success("✅ Artista actualizado correctamente");
      } else {
        await axios.post(API_URL, data);
        toast.success("🎨 Artista agregado correctamente");
      }
      reset();
      setEditingId(null);
      loadArtistas();
    } catch {
      toast.error("❌ Error al guardar el artista");
    }
  };

  const handleEdit = (artista) => {
    setEditingId(artista.id);
    reset(artista);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este artista?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        toast.success("🗑️ Artista eliminado correctamente");
        loadArtistas();
      } catch {
        toast.error("❌ Error al eliminar artista");
      }
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-primary fw-bold">
        🧑‍🎨  Gestión de Artistas
      </h1>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card p-4 shadow-sm mb-5"
      >
        <div className="row g-3">
          <div className="col-md-4">
            <input
              {...register("nombre", { required: "El nombre es obligatorio" })}
              className="form-control"
              placeholder="Nombre"
            />
            {errors.nombre && (
              <small className="text-danger">{errors.nombre.message}</small>
            )}
          </div>

          <div className="col-md-4">
            <input
              {...register("nacionalidad")}
              className="form-control"
              placeholder="Nacionalidad"
            />
          </div>

          <div className="col-md-4">
            <input
              {...register("estilo")}
              className="form-control"
              placeholder="Estilo artístico"
            />
          </div>

          <div className="col-12 text-end">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  reset();
                }}
                className="btn btn-secondary me-2"
              >
                Cancelar
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {editingId ? "Actualizar" : "Agregar"} Artista
            </button>
          </div>
        </div>
      </form>

      {/* TABLA */}
      <div className="table-responsive">
        <table className="table table-hover align-middle shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nacionalidad</th>
              <th>Estilo</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {artistas.length > 0 ? (
              artistas.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.nombre}</td>
                  <td>{a.nacionalidad || "-"}</td>
                  <td>{a.estilo || "-"}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleEdit(a)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="btn btn-danger btn-sm"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No hay artistas registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
