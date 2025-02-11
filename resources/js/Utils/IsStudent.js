import { usePage } from "@inertiajs/vue3";

export function isStudent() {
  const page = usePage();
  return (
    page.props.auth &&
    page.props.auth.user &&
    page.props.auth.user.role === "student"
  );
}
