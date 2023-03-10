package com.ecommerce.springboot.dto;

import com.ecommerce.springboot.entity.Address;
import com.ecommerce.springboot.entity.Customer;
import com.ecommerce.springboot.entity.Order;
import com.ecommerce.springboot.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address billingAddress;
    private Address shippingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
