import FormField from "../components/FormField";

export default function PersonalSection({ form, onChange }) {
  return (
    <>
      <h2 className="h5 mb-3">Personal information</h2>

      <div className="row">
        <div className="col-md-6">
          <FormField
            label="First name"
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            required
            placeholder="Anna"
          />
        </div>
        <div className="col-md-6">
          <FormField
            label="Last name"
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            required
            placeholder="Nováková"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Gender</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="gender-female"
              name="gender"
              value="female"
              checked={form.gender === "female"}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="gender-female">
              Female
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="gender-male"
              name="gender"
              value="male"
              checked={form.gender === "male"}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="gender-male">
              Male
            </label>
          </div>
        </div>
      </div>

      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        required
        placeholder="you@example.com"
      />
    </>
  );
}
