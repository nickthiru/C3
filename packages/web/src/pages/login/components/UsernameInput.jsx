export default function UsernameInput(props) {
  return (
    <div>
      <label className="label">
        <span className="text-base label-text">Email/Username</span>
      </label>
      <input
        type="text"
        value={props.username}
        className="w-full input input-bordered"
        onChange={(e) => props.onInput(e.target.value)}
      />
    </div>
  );
}
