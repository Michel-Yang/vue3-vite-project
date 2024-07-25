import service from '@/utils/service'

export const loginApi={
    login: (data: any) => {
        return service.post('/login', data)
    }
}


