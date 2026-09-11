import { useMemo } from "react";
import {
    useLocation,
    useNavigate,
    useParams as useRouteParams,
    useSearchParams as useRouteSearchParams,
} from "react-router-dom";

export function useRouter() {
    const navigate = useNavigate();
    return useMemo(
        () => ({
            push: (to: string) => navigate(to),
            replace: (to: string) => navigate(to, { replace: true }),
            back: () => navigate(-1),
        }),
        [navigate],
    );
}

export function usePathname() {
    return useLocation().pathname;
}

export function useSearchParams() {
    const [params] = useRouteSearchParams();
    return params;
}

export function useParams<T extends Record<string, string | undefined>>() {
    return useRouteParams() as T;
}

export function notFound(): never {
    throw new Error("NOT_FOUND");
}
